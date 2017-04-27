﻿using System.Collections.Generic;

namespace DataAccess.Write
{
    /// <summary>
    ///     A template for a task
    /// </summary>
    public class TaskTemplate
    {
        /// <summary>
        ///     Template identifier
        /// </summary>
        public virtual int Id { get; set; }

        /// <summary>
        ///     name of the template
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        ///     An optional description of the template
        /// </summary>
        public virtual string Description { get; set; }

        /// <summary>
        ///     List of parameters
        /// </summary>
        public virtual IList<TaskTemplateVersion> Versions { get; set; }
    }
}
