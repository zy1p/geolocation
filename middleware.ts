import { NextRequest, NextResponse } from 'next/server'
import countries from './lib/countries.json'

// run only on homepage
export const config = {
  matcher: '/',
}

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo, ip } = req
  const country = geo.country || 'US'
  const city = geo.city || 'San Francisco'
  const region = geo.region || 'CA'
  const latitude = geo.latitude || ''
  const longitude = geo.longitude || ''

  const countryInfo = countries.find((x) => x.cca2 === country)

  const currencyCode = Object.keys(countryInfo.currencies)[0]
  const currency = countryInfo.currencies[currencyCode]
  const languages = Object.values(countryInfo.languages).join(', ')

  url.searchParams.set('city', city)
  url.searchParams.set('country', country)
  url.searchParams.set('currencyCode', currencyCode)
  url.searchParams.set('currencySymbol', currency.symbol)
  url.searchParams.set('ip', ip || '')
  url.searchParams.set('languages', languages)
  url.searchParams.set('latitude', latitude)
  url.searchParams.set('longitude', longitude)
  url.searchParams.set('name', currency.name)
  url.searchParams.set('region', region)
  url.searchParams.set(
    'timezone',
    req.headers.get('x-vercel-ip-timezone') || ''
  )

  return NextResponse.rewrite(url)
}
