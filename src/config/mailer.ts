interface mailerConfig {
  host: string,
  port: number,
  auth: {
    user: string,
    pass: string
  }
}

export const mailerConfig: mailerConfig = {
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '2678c722178512',
    pass: 'a7e753ee575b6d'
  }
};