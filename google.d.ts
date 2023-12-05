declare namespace google.accounts {
  const id: {
    initialize: (options: {
      client_id: string;
      callback: (response: any) => void;
    }) => void;
    prompt: () => void;
    renderButton: (
      element: HTMLElement | null,
      options: {
        theme: string;
        size: string;
      }
    ) => void;
  };
}
