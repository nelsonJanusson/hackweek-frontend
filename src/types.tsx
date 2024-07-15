export type DriverDto = {
  id: string;
  name: string;
  assignments: AssignmentDto[];
  status: string;
};

export type DriverInfo = {
  id: string;
  name: string;
  status: string;
};

export type AddDriverDto = {
  name: string;
};

export type TruckDto = {
  id: string;
  payload: number;
  weight: number;
  height: number;
  status: string;
  assignments: AssignmentDto[];
};

export type TruckInfo = {
  id: string;
  payload: number;
  weight: number;
  height: number;
  status: string;
};

export type AddTruckDto = {
  payload: number;
  weight: number;
  height: number;
};

export type LegInfo = {
  id: string;
  startDate: Date;
  endDate: Date;
  startLocation: string;
  endLocation: string;
};

export type AddLegDto = {
  startDate: Date;
  endDate: Date;
  startLocation: string;
  endLocation: string;
};

export type AssignmentDto = {
  id: string;
  legs: LegInfo[];
  product: string;
  pickupLocation: string;
  destination: string;
  driverInfo: DriverInfo;
  truckInfo: TruckInfo;
  status: string;
};

export type AddAssignmentDto = {
  product: string;
  pickupLocation: string;
  destination: string;
};
