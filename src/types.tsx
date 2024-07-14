export type Driver = {
  id: string;
  name: string;
  salary: number;
};

export type AddDriverDto = {
  name: string;
  salary: number;
};

export type Truck = {
  id: string;
  year: number;
  type: string;
};

export type AddTruckDto = {
  year: number;
  type: string;
};

export type Assignment = {
  id: string;
  legs: Leg[];
  product: string;
  pickupLocation: string;
  destination: string;
  driverDto: Driver;
  truckDto: Truck;
};

export type AddAssignmentDto = {
  product: string;
  pickupLocation: string;
  destination: string;
};

export type Leg = {
  id: string;
  startDate: Date;
  endDate: Date;
  startLocation: string;
  endLocation: string;
};

export type AddLegDto = {
  assignmentId: string;
  startDate: Date;
  endDate: Date;
  startLocation: string;
  endLocation: string;
};
