export type Framework = 'React' | 'Angular' | 'Vue';

export interface AnalysisIssue {
  id: string;
  category: 'performance' | 'readability' | 'best-practices' | 'syntax' | 'compilation' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
  suggestion: string;
}

export interface AnalysisResult {
  score: number;
  issues: AnalysisIssue[];
}
