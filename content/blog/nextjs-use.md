---
title: "Using 'use' to stream deferred content"
date: 2024-08-30
categories: Web
---

In the constant bid to improve page performance, I discovered `use`, an API recently shipped by React, and made available in Next.js. You'd be forgiven for not immediately understanding its function, given the oh-so-descriptive name.

[use](https://react.dev/reference/react/use) lets you read the value of a promise (or context if you're that way inclined). It feels like a bit of syntactic sugar, to avoid writing `.then()` or `await` within your component, but I'm sure there's more to it than that.

## When is it useful?

![](/images/blog/use-carousel.jpg)

Take this carousel. Pretty standard stuff at the end of a product page. Definitely shouldn't be render-blocking, and a prime candidate for deferred loading. We could move the data request into a client-side handler and call `useEffect` to fetch the data on the client, but finding ways to avoid `useEffect` becomes a source of personal pride once you've worked on a React project for any length of time. This approach has to wait for the whole page to hydrate before it can get to work loading the data.

Instead, we can still begin fetching the data on the server, but combine `<Suspense>` and `use` to handle the loading state before resolving it on the client.

## What does it look like?

Before:

```tsx
export default async function Page() {
	// Wait for the data to load
    const vehicles = await getVehiclesFromDB();

    return {
        <>
            // ... render the page
            <SimilarVehicles vehicles={vehicles} />
        </>
    }
}

export const SimilarVehicles: React.FC<{
    vehicles: VehiclePreview[];
}> = ({ vehicles }) => {
    return (
        <section className={cx(styles.section)}>
            {vehicles.map((vehicle) => (
                <VehicleCard
                    key={vehicle.vehicleId}
                    vehicle={vehicle}
                />
            ))}
        </section>
    );
};
```

After:

```tsx
export default async function Page() {
    // Crack on rendering the page
    const vehiclesPromise = getVehiclesFromDB();

    return {
        <>
            // ... render the page
            <Suspense fallback={<LoadingState />}>
                <SimilarVehicles vehiclesPromise={vehiclesPromise} />
            </Suspense>
        </>
    }
}

export const SimilarVehicles: React.FC<{
    vehiclesPromise: Promise<VehiclePreview[]>;
}> = ({ vehiclesPromise }) => {
    // Resolve the promise
    const vehicles = use(vehiclesPromise);

    return (
        <section className={cx(styles.section)}>
            {vehicles.map((vehicle) => (
                <VehicleCard
                    key={vehicle.vehicleId}
                    vehicle={vehicle}
                />
            ))}
        </section>
    );
};
```

## How does it work?

By continuing to call the vehicles database from the server, we've kept our precious server-side secrets safe. But by omitting `await`, we can crack on with streaming the page to the user much quicker than before.

React pops our fallback component in place, and continues to stream the page in the background until the database call resolves. At that point, the page connection closes and the component inside `<Suspense>` is rendered. `use` converts the promise over to our intended data format, and the component renders as expected.

You can even use `ErrorBoundary` to handle promise failures. Pretty neat.

## Does it work without JS?

Sadly not. React needs JS at runtime to swap out the loading content with the deferred content. Non-JS users will be left with the loading component for infinity. So this isn't appropriate for core user journey functionality, or spider-friendly content.
