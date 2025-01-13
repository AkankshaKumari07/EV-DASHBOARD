"use client";

import { useEffect, useState } from "react";
import { Car, Battery, Zap, MapPin } from "lucide-react";
import { processEvData } from "./utils/process-data";
import { DashboardData, EVData } from "./types/data";
import { StatCard } from "./components/stat-card";
import { BarChartComponent } from "./components/bar-chart";
import { DonutChart } from "./components/donut-chart";
import { Header } from "./components/header";

export default function Dashboard() {
  const [data, setData] = useState<EVData[]>([]);
  const [selectedCounty, setSelectedCounty] = useState("All Counties");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/vedant-patil-mapup/analytics-dashboard-assessment/main/data-to-visualize/Electric_Vehicle_Population_Data.csv"
    )
      .then((response) => response.text())
      .then((csvText) => {
        const lines = csvText.split("\n");
        const parsedData: EVData[] = lines.slice(1).map((line) => {
          const values = line.split(",");
          return {
            vin: values[0],
            county: values[1],
            city: values[2],
            state: values[3],
            modelYear: parseInt(values[5]),
            make: values[6],
            model: values[7],
            electricVehicleType: values[8],
            cleanAlternativeFuelVehicleEligibility: values[9],
            electricRange: parseInt(values[10]) || 0,
            baseMSRP: parseInt(values[11]) || 0,
            legislativeDistrict: values[12],
            dolVehicleId: values[13],
            vehicleLocation: values[14],
            electricUtility: values[15],
            censusTract: values[16],
          };
        });
        setData(parsedData);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    const processor = processEvData(data);

    const filteredData =
      selectedCounty === "All Counties"
        ? data
        : processor.filterByCounty(selectedCounty);
    if (filteredData.length === 0) {
      setDashboardData({
        totalVehicles: 0,
        averageRange: 0,
        countyData: [],
        makeData: [],
        typeData: [],
        yearlyTrend: [],
      });
      return;
    }

    setDashboardData({
      totalVehicles: filteredData.length,
      averageRange: processor.getAverageRange(filteredData),
      countyData: processor.getCountyDistribution(filteredData),
      makeData: processor.getMakeDistribution(filteredData),
      typeData: processor.getEvTypeDistribution(filteredData),
      yearlyTrend: processor.getYearlyTrend(filteredData),
    });
  }, [data, selectedCounty]);

  if (!dashboardData) return <div>Loading...</div>;

  const counties = [...new Set(data.map((ev) => ev.county))].sort();

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        counties={counties}
        selectedCounty={selectedCounty}
        onCountyChange={setSelectedCounty}
      />
      <div className="flex-1 space-y-4 p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total EVs"
            value={dashboardData.totalVehicles.toLocaleString()}
            description="Total registered electric vehicles"
            icon={<Car className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Average Range"
            value={`${dashboardData.averageRange} mi`}
            description="Average electric range"
            icon={<Battery className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Top Make"
            value={dashboardData.makeData[0]?.name || "N/A"}
            description="Most common manufacturer"
            icon={<Zap className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Top County"
            value={dashboardData.countyData[0]?.name || "N/A"}
            description="Highest EV concentration"
            icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <BarChartComponent
            data={dashboardData.makeData}
            title="Vehicle Make Distribution"
            description="Number of vehicles by manufacturer"
          />
          <DonutChart
            data={dashboardData.typeData}
            title="EV Type Distribution"
            description="Distribution of BEV vs PHEV vehicles"
          />
          <BarChartComponent
            data={dashboardData.yearlyTrend}
            title="Yearly Trend"
            description="Number of EVs by model year"
          />
          <BarChartComponent
            data={dashboardData.countyData}
            title="County Distribution"
            description="Number of EVs by county"
          />
        </div>
      </div>
    </div>
  );
}
