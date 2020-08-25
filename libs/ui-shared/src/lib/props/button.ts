export type ButtonProps = {
  /**
   * Define the type of action the button triggers
   *
   * - `solid`: buttons direct the user’s attention to the primary action the application is suggesting that the user take.
   * - `outline`: buttons indicate secondary actions that compliments a primary action or reduces visual noise when there are many actions on the page.
   * - `flat`: buttons are used as tertiary buttons. Can also be used inline because they are different from content in style and recognizable as buttons alongside content.
   */
  action: 'solid' | 'outline' | 'flat';
  /**
   * Sets the color of the button to match the following string statuses
   */
  status: 'primary' | 'success' | 'danger' | 'inverse';
  /**
   * Sets the overall height and width of the button based on the following string values:
   */
  size: 'sm' | 'md';
  /** Sets if the button should be full width with display block */
  block: boolean;
  /**
   * Changes the button content based on the value passed.
   *
   * - `default`: shows the content of the button
   * - `loading`: disables the button and shows a spinner inside the button
   * - `success`: disables the button and shows a check mark inside the button; auto-triggers to change back to DEFAULT state after 1000 ms
   * - `error`: shows the content of the button (in the context of application, this state is usually entered from a LOADING state. the application should show appropriate error message)
   */
  loadingState: 'default' | 'loading' | 'success' | 'error' ;

  /**
   * title
   */
  title: string;

  onclick?: (ev: Event) => void | null;

  disabled?: boolean;
};
