export interface Audit {
  id: string
  title: string
  description?: string
  location: string
  auditorId: string
  auditorName: string
  status: 'draft' | 'in_progress' | 'completed' | 'reviewed'
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  anomalies: Anomaly[]
  photos: MediaFile[]
  audioNotes: MediaFile[]
  floorPlan?: FloorPlan
  signature?: string
  reportGenerated?: boolean
  collaborators?: string[]
}

export interface Anomaly {
  id: string
  auditId: string
  type: AnomalyType
  severity: 'minor' | 'major' | 'critical'
  title: string
  description: string
  location: string
  coordinates?: { x: number; y: number }
  photos: MediaFile[]
  audioNote?: MediaFile
  aiSuggestion?: AISuggestion
  correctionStatus: 'pending' | 'in_progress' | 'completed'
  estimatedTime?: number // in hours
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
}

export interface AnomalyType {
  id: string
  name: string
  category: 'structural' | 'electrical' | 'plumbing' | 'safety' | 'environmental' | 'other'
  icon: string
  color: string
  commonCauses: string[]
  recommendedActions: string[]
}

export interface MediaFile {
  id: string
  type: 'photo' | 'audio'
  filename: string
  url: string
  blob?: Blob
  size: number
  createdAt: Date
  transcription?: string
  aiAnalysis?: ImageAnalysis
}

export interface ImageAnalysis {
  detectedAnomalies: string[]
  confidence: number
  suggestions: string[]
  boundingBoxes?: BoundingBox[]
}

export interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
  label: string
  confidence: number
}

export interface AISuggestion {
  anomalyType: string
  description: string
  recommendedActions: string[]
  severity: 'minor' | 'major' | 'critical'
  estimatedTime: number
  priority: number
  confidence: number
  userFeedback?: 'accepted' | 'rejected' | 'modified'
}

export interface FloorPlan {
  id: string
  auditId: string
  imageUrl: string
  width: number
  height: number
  scale?: number // pixels per meter
  anomalyMarkers: AnomalyMarker[]
}

export interface AnomalyMarker {
  id: string
  anomalyId: string
  x: number
  y: number
  type: string
  severity: 'minor' | 'major' | 'critical'
}

export interface AuditReport {
  id: string
  auditId: string
  format: 'pdf' | 'word'
  filename: string
  generatedAt: Date
  template: string
  data: any
  blob?: Blob
}

export interface AuditFilters {
  status?: string[]
  severity?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  auditor?: string
  location?: string
  anomalyType?: string[]
}
