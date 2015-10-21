﻿namespace Web.Commands
{
    public class ModifyMailTask : ICommand
    {
        public virtual string MailtaskId { get; set; }

        public virtual string Name { get; set; }

        public virtual string Text { get; set; }

        public virtual string Recipients { get; set; }

        public virtual string Sender { get; set; }

        public virtual int EnviromentId { get; set; }

        public virtual int ApplicationId { get; set; }
    }
}
