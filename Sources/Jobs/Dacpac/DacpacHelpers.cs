﻿namespace Jobs.Dacpac
{
    using Bazooka.Core;
    using Microsoft.SqlServer.Dac;
    using System;
    using System.IO;

    public static class DacpacHelpers
    {
        public static void ApplyDacpac(Stream dacpac, string connectionString, string databaseName, ILogger log)
        {
            var options = new DacDeployOptions()
            {
                BlockOnPossibleDataLoss = true
            };


            var service = new DacServices(connectionString);
            service.Message += (x, y) =>
            {
                log.Log(y.Message.Message);
            };
            try
            {
                using (var package = DacPackage.Load(dacpac))
                {
                    service.Deploy(package, databaseName, true, options);
                }
            }
            catch (Exception e)
            {
                log.Log(e.Message, true);
            }
        }
    }
}
