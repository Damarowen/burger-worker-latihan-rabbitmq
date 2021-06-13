
export interface MakeBurgerPayload {
  customer: string;
  patties: number;
  retryCount?: number;
}

export interface MakeBurgerSuccessPayload {
  customer: string;
}


export interface MakeBurgerFailurePayload {
  customer: string;
}
