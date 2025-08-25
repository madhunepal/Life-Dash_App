
export enum TransactionType {
  Income = 'Income',
  Expense = 'Expense',
}

export interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: string;
  type: TransactionType;
}

export interface Exercise {
  id: string;
  name: string;
  duration: number; // in minutes
  date: string;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  isAiGenerated: boolean;
}
