export default class EmailInputViewModel {
  isValidEmail(email: string): boolean {
    const re =
      /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)?([.]{1}[a-zA-Z]{2,4}){1,4}$/;
    return re.test(email);
  }
}
