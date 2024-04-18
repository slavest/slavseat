const sharedConfig = require('@slavseat/prettier-config');

module.exports = {
    ...sharedConfig,
    plugins: [...sharedConfig.plugins, "prettier-plugin-tailwindcss"]
}