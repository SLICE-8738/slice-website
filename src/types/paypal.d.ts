declare var paypal: {
  HostedButtons: (config: { hostedButtonId: string }) => {
    render: (selector: string) => void;
  };
};
