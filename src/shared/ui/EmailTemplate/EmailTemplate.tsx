interface EmailTemplateProps {
    description: string;
    contact: string
}


export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
                                                                          description,
                                                                          contact
                                                                      }) => (
    <div>
        <h1>Привет, vaironfop@Mail.ru!</h1>
        <h2>Это баг-репорт от {contact}</h2>
        <p>{description}</p>
    </div>
);

export default EmailTemplate;
