export type RiskStatus = 'healthy' | 'moderate' | 'high-risk';
export type WaterStressLevel = 'Low' | 'Medium' | 'High';
export type PlantHealthLevel = 'Good' | 'Moderate' | 'Poor';
export type CarbonIndicatorTrend = 'Positive' | 'Stable' | 'Negative' | 'Unavailable';

export interface ScoreBreakdown {
  vegetation: number;
  water: number;
  soil: number;
  carbon: number;
  management: number;
  [key: string]: any;
}

export interface HistoricalObservation {
  date: string;
  sceneId?: string;
  cloudCover?: number;
  validPixelRatio?: number;
  ndvi: number;
  ndwi: number;
  ndmi?: number;
  soilMoisture?: number;
  soilMoistureProxy?: number;
  sustainabilityScore?: number;
  nbr?: number;
  [key: string]: any;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  date: string;
  [key: string]: any;
}

export interface Parcel {
  id: string;
  number: string;
  name: string;
  location: string;
  crop: string;
  areaHa: number;
  status: RiskStatus;
  sustainabilityScore?: number;
  scoreBreakdown?: ScoreBreakdown;
  ndvi: number;
  ndwi: number;
  ndmi?: number;
  soilMoisture: number;
  waterStress: WaterStressLevel;
  plantHealth: PlantHealthLevel;
  carbonIndicator: CarbonIndicatorTrend;
  lastObservation?: string;
  lastUpdated?: string;
  farmerName?: string;
  contractId?: string;
  polygon: [number, number][]; // [lat, lng] array
  historicalData?: HistoricalObservation[];
  alerts?: Alert[];
  satelliteMetadata?: Record<string, any>;
  spectralBands?: Record<string, number>;
  isDemo?: boolean;
  [key: string]: any;
}

export type GeoPolygon = {
  type: 'Polygon';
  coordinates: [number, number][][];
};

export interface SatelliteSceneAsset {
  href: string;
  title?: string;
  type?: string;
  [key: string]: any;
}

export interface SatelliteScene {
  id: string;
  provider: string;
  platform: string;
  collection: string;
  datetime: string;
  cloudCoverPercent: number;
  tileId: string;
  bbox: [number, number, number, number];
  assets: Record<string, SatelliteSceneAsset | undefined>;
  quality?: {
    overallScore?: number;
    cloudCoveragePercentage?: number;
    isValid?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface SpectralStatistics {
  count: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  stdDev: number;
}

export interface TimeSeriesObservation {
  date: string;
  sceneId: string;
  cloudCover: number;
  validPixelRatio: number;
  ndvi: number;
  ndwi: number;
  ndmi: number;
  soilMoistureProxy: number;
  nbr?: number;
  [key: string]: any;
}

export interface RasterAnalysisResult {
  scene: SatelliteScene;
  pixelStats: {
    totalPixels: number;
    validPixels: number;
    cloudMaskedPixels: number;
    validPixelRatio: number;
    cloudMaskedRatio: number;
    shadowMaskedPixels?: number;
    noDataPixels?: number;
    shadowRatio?: number;
    noDataRatio?: number;
    resolutionMeters: number;
    [key: string]: any;
  };
  reflectances: {
    B02: number;
    B03: number;
    B04: number;
    B08: number;
    B11: number;
    B12: number;
    [key: string]: any;
  };
  indices: {
    ndvi: SpectralStatistics;
    ndwi: SpectralStatistics;
    ndmi: SpectralStatistics;
    nbr: SpectralStatistics;
    ndre?: SpectralStatistics;
    evi?: SpectralStatistics;
    savi?: SpectralStatistics;
    [key: string]: any;
  };
  indexMetadata?: Record<string, any>;
  spatialRiskGrid?: {
    totalCells: number;
    stressedCells: number;
    watchCells: number;
    healthyCells: number;
    stressPercentage: number;
    [key: string]: any;
  };
  derivedMoistureProxy: {
    canopyMoistureIndex: number;
    estimatedMoistureScore: number;
    disclaimer: string;
    [key: string]: any;
  };
  visualizations: {
    rgbPreviewUrl?: string;
    rgbPngBase64?: string;
    ndviPngBase64?: string;
    ndwiPngBase64?: string;
    ndmiPngBase64?: string;
    stressPngBase64?: string;
    bounds: [[number, number], [number, number]];
    [key: string]: any;
  };
  [key: string]: any;
}

export interface PracticeSignal {
  id?: string;
  type?: string;
  title?: string;
  signalType?: string;
  status: string;
  evidenceLevel?: string;
  confidence: string;
  evidence: string[];
  limitations?: string;
  verificationRequirement?: string;
  verificationStatus?: string;
  observationDate?: string;
  recommendation?: string;
  dateDetected?: string;
  disclaimer?: string;
  [key: string]: any;
}

export interface FieldVerificationTask {
  id: string;
  title: string;
  category?: string;
  priority: string;
  description: string;
  status: string;
  assignedTo?: string;
  protocol?: string;
  targetCoordinates?: [number, number];
  evidenceNeeded?: string[];
  [key: string]: any;
}

export interface WeatherData {
  parcelId: string;
  period: string;
  temperatureC: number;
  rainfallMm: number;
  relativeHumidityPercent: number;
  et0MmPerDay: number;
  droughtRiskIndex: 'Low' | 'Moderate' | 'High' | 'Severe';
  correlationSummary: string;
  tempMinC: number;
  tempMaxC: number;
  windSpeedKmh: number;
  observationDate: string;
  provider: string;
  dataSource: string;
  fetchedAt: string;
  location: { lat: number; lng: number };
  units: Record<string, string>;
  dataFreshness: string;
  [key: string]: any;
}

export type PipelineStageStatus = 'pending' | 'running' | 'completed' | 'failed' | string;

export interface PipelineStage {
  id: string;
  number: number;
  name: string;
  description: string;
  status: PipelineStageStatus;
  detail?: string;
  techDetail?: string;
  [key: string]: any;
}

export interface AnalysisJob {
  id: string;
  mode: 'LIVE' | 'DEMO';
  status: 'queued' | 'running' | 'completed' | 'failed';
  currentStageNumber: number;
  totalStages: number;
  stages: any[];
  createdAt: string;
  updatedAt: string;
  result?: FullAnalysisPayload;
  error?: string;
  [key: string]: any;
}

export interface AIAnalysisResult {
  overallStatus: string;
  summary: string;
  keyFindings: string[];
  risks: {
    title: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    explanation: string;
    evidence: string;
  }[];
  positiveSignals: string[];
  possibleDrivers: string[];
  recommendedActions: string[];
  verificationNeeded: string[];
  mrvStatus: {
    measurement: string[];
    reporting: string[];
    verification: string[];
  };
  confidenceLevel: 'High' | 'Medium' | 'Low';
  confidenceJustification: string;
  limitations: string[];
  generatedAt: string;
  modelUsed: string;
  [key: string]: any;
}

export interface FullAnalysisPayload {
  parcel: Parcel;
  satelliteMetadata: Record<string, any>;
  spectralBands: Record<string, number>;
  calculatedIndices: {
    ndvi: number;
    ndviTrend: number;
    ndwi: number;
    ndwiTrend: number;
    ndmi: number;
    soilMoisture: number;
    waterStress: WaterStressLevel;
    plantHealth: PlantHealthLevel;
    carbonIndicator: CarbonIndicatorTrend;
    [key: string]: any;
  };
  pixelStats: Record<string, any>;
  spectralStats: Record<string, any>;
  spatialRiskGrid?: Record<string, any>;
  visualizations?: Record<string, any>;
  historicalObservations?: HistoricalObservation[];
  aiAssessment: AIAnalysisResult;
  weatherData?: WeatherData;
  practiceSignals?: PracticeSignal[];
  verificationTasks?: FieldVerificationTask[];
  isDemoMode?: boolean;
  dataSourceLabel?: string;
  timestamp?: string;
  mrvReport?: Record<string, any>;
  [key: string]: any;
}

export interface AIUIAction {
  type: string;
  label?: string;
  parcelId?: string;
  payload?: any;
  [key: string]: any;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  structured?: {
    summary?: string;
    keyFindings?: string[];
    recommendations?: string[];
    concerns?: string[];
    metricsTable?: Array<{ label: string; value: string; assessment: string }>;
    [key: string]: any;
  };
  actions?: AIUIAction[];
  suggestedActions?: string[];
  dataRef?: any;
  metadata?: Record<string, any>;
  [key: string]: any;
}

export type ActiveTab = 'monitor' | 'analysis' | 'assistant' | 'practices' | 'reports' | 'methodology' | 'analytics';
export type AnalyticsSubTab = 'vegetation' | 'water' | 'soil' | 'carbon';
