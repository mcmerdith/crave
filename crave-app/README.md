# Dev Setup

For the API to work correctly, you will need to set `TRPC_HOST` to your machine's IP address in [config.ts](config.ts)

Using the production server will also work, provided that your branch is up to date with `main`

## Extra steps

When you run `npm install`, it should automatically perform a required patch to the `react-native-reanimated-skeleton`
package

Make sure you see

```
> @crave/app@1.0.0 postinstall
> node scripts/postinstall.mjs

Patching react-native-linear-gradient to use expo-linear-gradient instead
Running postinstall script for react-native-reanimated-skeleton to support expo and patch share intents
Success!
```

At the bottom of your installer output
