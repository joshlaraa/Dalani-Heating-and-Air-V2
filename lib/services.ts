export const services = [
  'Air conditioning',
  'Heating',
  'Mini split systems',
  'Quiet Cool installation',
  'Service & repairs',
  'New installations',
] as const

export type Service = typeof services[number]
