export type Framework = 'React' | 'Angular' | 'Vue' ;

export interface AnalysisIssue {
  category: 'performance' | 'readability' | 'best-practices';
  severity: 'low' | 'medium' | 'high';
  explanation: string;
  suggestion: string;
}

export interface AnalysisResult {
  score: number;
  issues: AnalysisIssue[];
}
