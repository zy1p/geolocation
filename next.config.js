// @ts-check
const withTM = require('@vercel/examples-ui/transpile')()
const { withCountryInfo } = require('./scripts/countries')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['flagcdn.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
}

module.exports = withTM(withCountryInfo(nextConfig))
