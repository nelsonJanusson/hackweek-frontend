export type DriverDto = {
  id: string;
  name: string;
  salary: number;
  assignments: AssignmentDto[];
  status: string;
};

export type DriverInfo = {
  id: string;
  name: string;
  salary: number;
  status: string;
};

export type AddDriverDto = {
  name: string;
  salary: number;
};

export type TruckDto = {
  id: string;
  year: number;
  type: string;
  status: string;
  assignments: AssignmentDto[];
};

export type TruckInfo = {
  id: string;
  year: number;
  type: string;
  status: string;
};

export type AddTruckDto = {
  year: number;
  type: string;
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
