export interface EVData {
    vin: string
    county: string
    city: string
    state: string
    modelYear: number
    make: string
    model: string
    electricVehicleType: string
    cleanAlternativeFuelVehicleEligibility: string
    electricRange: number
    baseMSRP: number
    legislativeDistrict: string
    dolVehicleId: string
    vehicleLocation: string
    electricUtility: string
    censusTract: string
  }
  
  export interface ChartData {
    name: string
    value: number
  }
  
  export interface DashboardData {
    totalVehicles: number
    averageRange: number
    countyData: ChartData[]
    makeData: ChartData[]
    typeData: ChartData[]
    yearlyTrend: ChartData[]
  }
  
  