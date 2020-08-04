interface Status {
  label: string;
  complete: boolean;
}

class StatusViewModel {
  active = -1;
  private availableStatuses: string[] = [
    'Open',
    'Ready for Pickup',
    'Assigned',
    'Complete',
    'Cancelled',
  ];
  statuses: Status[] = [];

  constructor(status: string) {
    this.active = this.availableStatuses.indexOf(status);

    this.availableStatuses.forEach((label, index) => {
      this.statuses.push({
        label,
        complete: index < this.active,
      });
    });
  }
}

export default StatusViewModel;
