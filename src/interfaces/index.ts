export interface ListItem {
  id: number;
  businessDate: string;
  status: status;
  shift: shift;
  start: string;
  end: string;
  quantity: number;
  firstName: string;
  lastName: string;
  area: string;
  guestNotes: string;
}

export interface TableHeadProps {
    columns: TableColumn[];

    onSortClick: (sortBy: string, isAsc: boolean) => void
}

export interface TableColumn {
    name: string;
    sortBy?: string;
}

enum status {
  CONFIRMED = "CONFIRMED",
  SEATED = "SEATED",
  CHECKED_OUT = "CHECKED OUT", 
  NOT_CONFIRMED = "NOT CONFIRMED"
}

enum shift {
  DINNER = "DINNER",
  LUNCH = "LUNCH", 
  BREAKFAST = "BREAKFAST"
}
