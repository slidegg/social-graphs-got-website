using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;

namespace GenTest
{
    class Program
    {
        private const string LicenseHash = "<main_hash>vXCZ0IIr2GiKjfW92VC4udG7Pfjhr4I348NajBE1wnDw499v4V6rTb9hidtjY4UUte07UOi7lXDQGuDpjkuFR93TY84sNg4B6w0tZ517h49sB6Anh7W5qo6O00a81o619Os6BARMM6Xe0cxo4DBgoC</main_hash><ecc_public>GA2QGAQHAABACFACCUALEC65N7ZWQTPZE4S6F2WAK24IESJIP55AEFIATK3VJQE557YG7RLVO4FV63ONUTTKIFPC</ecc_public><ecc_private>GBFQGAQHQABACFACCUALEC65N7ZWQTPZE4S6F2WAK24IESJIP55AEFIATK3VJQE557YG7RLVO4FV63ONUTTKIFPCAIKDITXRO3BSB6YTZ6R444IOBIWUXQG42HRA</ecc_private><rsa_public_1>028201009baafca8cacbc0bfa0da40401a8c574af86cb1a54da002ede279948f7cf5f7a7bf0d3517f7465ca8e65e83c036dfa07f9c04c48183a7793a18228ffaaa10eb4fafda9503286ea3205833a000b396fc89c8a1a4d6af7ee71db3ed27462c5dd47aeb17fda39ec5d4340453c3f40bc621e74d2710d8b9dd7ea7a4c8c2f47e69c2e5fe4130f4457999bee1eb2c0889a45d353d06a78594ec683cb7646e3ccbe39240f9aea7496c62fa94788c908d3b2c5b27a8f238f3a2acdad1e430ec11903d6bcda3c577d985d84d2ae625b6e304a2ca86930812a5a9e5d8b9c8dd3149f3fea01b1efa1dae334982b1dad97132d4250cc1f7957740c58fe669ba206d18fc6a10ab0203010001</rsa_public_1><rsa_private_1>020100028201009baafca8cacbc0bfa0da40401a8c574af86cb1a54da002ede279948f7cf5f7a7bf0d3517f7465ca8e65e83c036dfa07f9c04c48183a7793a18228ffaaa10eb4fafda9503286ea3205833a000b396fc89c8a1a4d6af7ee71db3ed27462c5dd47aeb17fda39ec5d4340453c3f40bc621e74d2710d8b9dd7ea7a4c8c2f47e69c2e5fe4130f4457999bee1eb2c0889a45d353d06a78594ec683cb7646e3ccbe39240f9aea7496c62fa94788c908d3b2c5b27a8f238f3a2acdad1e430ec11903d6bcda3c577d985d84d2ae625b6e304a2ca86930812a5a9e5d8b9c8dd3149f3fea01b1efa1dae334982b1dad97132d4250cc1f7957740c58fe669ba206d18fc6a10ab02030100010281ffc91167f348a93af8f4cb9e31d96e1752bee4513bddb2d0c073c74172154b9fed0c2eadbaf1aa9b5a38dfdbf86ae86f11ba746e08315acb3ae94710b20af924f87381e24cdc9760c7bbd048309fc7bbbf9211382ebfd52ab1330bca59844a58d46c2a90c8c6f6c0771a7517fb7739c9e64f16d15674124f863aa7c129621f399d28ab83c0a1cc981dc58d3c462b26c95d9f76b17bc62f14b3ce35e16d7152ea210639d278123d4f53a1a06bd0a30313d0583d146f6e944a85fc3dcaae6b7e9a93e2be51cd4f1de36f6cec66aa6ce39d746ff22bf02efb2daf167482559ceece60614c911499e3806134257c56c44e82f337ae7bafb48c532c4cfd1d6e70d701028180b52f0d6891d8c866187dd38c2f18a504aa1061af481c09a107be5f8ce5a46bc81c37feccfd379cc80f7b84275034f5bcf504339cc9dd13fa445147d6c87a48cd7ac1cdc5ccf22819e5ab0e7e309b2b0a5b23cd5249ddab365d8a7341cacf2dc47f1e716534a1bdca658efe5edc03250a6773ba175dbca7a4f4716fc535e033bf028180dbf2a650bfd8a4824f5c90e0f1b33cf35a93f6a6f86d2080ad64c084094721bc02599da02133966474b7338a42958d8d36fc66e1ce383fcb8a1ec829116ebb33e906160ab8300e720c96a9be82d37671daefab9bdfd617522e4ff5299d5d92df8334bf168aceea5fafb8e1efa50d4d7428eedfb731f759d2bd4cdc7c60a6ae150281810065e51d5c56d19cfa5601c58c4c1c4709d57ebb0131c39ae2b61129797ad8ba48e31dd6ad8026db8463b8aa3cd5cdc2f9ceaddb3ced05e92b516a88c5511ffc7b9af30d7f9560068f71eb7e8e1755dca1c959dc29d022db1c0b054706944169d2dd4ec8a50b317f2429737eb8e870d84efe9945e9c82cc5f76e05b1bf2e2a75cf028180278806326f38bde099e8f63527dbe2318eef171ecd79b7a4c90559c0a176426eeb31362e68a93ff7902eb939b95bedd41ab4e4bce2f6a328af0b77484254d79aade025280a10c117e8814fc2e8fa9ec839e467c09d4b7a678fe1591c00a7a7d53a5cc997809d4deca2c5a4fe10794299851de1e1a83e5fcb8bb07bd472fea23d0281802d92b20eac00186496a1a967a91ce86b330a43ba32ba9bcf1256bfc8d04ec3f93e1da86efbdd400e8e41acab2ecfb0cec00775dd60d1b034dba4b7c55ccb1388717c5e4a41b293244a287d6be314d77110128c252cb432d04a2a16245e245b05a3e46d3017bdf28f94710ac63d99f3181944c01c8e0ec80b33aa7cb8b9b92cf6</rsa_private_1><rsa_public_2>02818097fdfbfa5ffeaedbff169c646ea977dba562003cabf212a41e76a2c5548670629a91b24bc4f70dfc3fd64e4e2726b3def8d87d8ce516a5405c19e01e780ecb961b114ed97f1f65eb93e3f59e6e23581e4ae8a5d694aa9cd5c1b4ecbce91cc75a86ac48c349c5d15b0fed72b9e6a799d3dc52ff0df7f80fd7e748e9cbcb8598db0203010001</rsa_public_2><rsa_private_2>02010002818097fdfbfa5ffeaedbff169c646ea977dba562003cabf212a41e76a2c5548670629a91b24bc4f70dfc3fd64e4e2726b3def8d87d8ce516a5405c19e01e780ecb961b114ed97f1f65eb93e3f59e6e23581e4ae8a5d694aa9cd5c1b4ecbce91cc75a86ac48c349c5d15b0fed72b9e6a799d3dc52ff0df7f80fd7e748e9cbcb8598db02030100010281800b9f60eae2f75340c06f66b329612d28af2b60d042e7c674255e361137e6f5e61c62c2cb177b3ae70caca31d47d22654091c68f162bd4a12b35849329b44aa5da8242381d300013bb7ae79abc136b07c446260707de25891123cdde9b00848d213b64ead1089c798dd3e89a504045b1e9bed894a5200bf2def00b222c652b4c10240aa85da38edcaa02aafdbe7f52cc3e23cac3fddf69bab0e0018f7172d827d3a6d4c5b263d3509a74b435240af39781660d27b3165b186b545998931e15e205c1b0240e42e3266902a3bff85b2a01a5ba1d4ffca67748a5e0c3a9a911165c367d9c43b0658acdc9a94430f2b374f2e7a229bb09727c30a1bd627e370605093cb22024102408837649b15594798d1e258e9015978dffeb906167943ab6b6885f97de13f27ed2791a87a3c63f9bfa5878f246a44039c5487146ea7e173eca539731f1491c50102402e63e6034c140a16ad0bdfd8fc002ed9c240be44d3521128138e41ee3452e5be4a5004f4e4c877c9c1b380f9a6031b3c0fbf19bc1864b5bf5bbd7924530c1b0102402fcd013841862bcd4b00e23f3c2e27defaf4af1f7ec3ef37443a2abc73d0c2c7755aa4d58317200303cd4f5e64f7bef365ed17badf56779dfac821964510412b</rsa_private_2>";
        static void Main(string[] args)
        {
            byte[] LicenseKeyBuff = new byte[4000];
            string pNameEdit = null;
            string pOrgEdit = null;
            string pCustomEdit = null;
            string pHardIdEdit = args[1];
            int mNumDays = Int32.Parse(args[0]);
            int mNumExec = 0;
            // SystemTime ExpDateSysTime = new SystemTime();
            // SystemTime NullExpDateSysTime = null;
            int SizeKey;

            if (mNumDays > 400)
            {
                Console.WriteLine("License days too high.");
                return;
            }

            SizeKey = WinlicenseSDK.WLGenLicenseFileKey(LicenseHash, pNameEdit, pOrgEdit, pCustomEdit, pHardIdEdit, mNumDays, mNumExec, 0, 0, 0, 0, LicenseKeyBuff);

            FileStream fs = new FileStream("License.txt", FileMode.Create);

            BinaryWriter w = new BinaryWriter(fs);

            for (int i = 0; i < SizeKey; i++)
            {
                w.Write((byte)LicenseKeyBuff[i]);
            }

            w.Close();
            fs.Close();
        }
    }

    class WinlicenseSDK
    {
        public int NewDate = 0;

        [DllImport("WinlicenseSDK64.dll", EntryPoint = "WLGenPassword", CallingConvention = CallingConvention.StdCall)]
        public static extern int WLGenPassword(string PassHash, string Name, StringBuilder PasswordBuffer);

        [DllImport("WinlicenseSDK64.dll", EntryPoint = "WLGenLicenseFileKey", CallingConvention = CallingConvention.StdCall)]
        public static extern int WLGenLicenseFileKey(string LicenseHash, string UserName, string Organization, string CustomData, string MachineID,
                             int NumDays, int NumExec, int NewDate, int CountryId, int Runtime, int GlobalTime, byte[] LicenseBuffer);

        [DllImport("WinlicenseSDK64.dll", EntryPoint = "WLGenLicenseRegistryKey", CallingConvention = CallingConvention.StdCall)]
        public static extern int WLGenLicenseRegistryKey(string LicenseHash, string UserName, string Organization, string CustomData, string MachineID,
            int NumDays, int NumExec, int NewDate, int CountryId, int Runtime, int GlobalTime, string RegName, string RegValueName, byte[] LicenseBuffer);

        [DllImport("WinlicenseSDK64.dll", EntryPoint = "WLGenLicenseTextKey", CallingConvention = CallingConvention.StdCall)]
        public static extern int WLGenLicenseTextKey(string LicenseHash, string UserName, string Organization, string CustomData, string MachineID,
          int NumDays, int NumExec, int NewDate, int CountryId, int Runtime, int GlobalTime, StringBuilder LicenseBuffer);

        [DllImport("WinlicenseSDK64.dll", EntryPoint = "WLGenLicenseSmartKey", CallingConvention = CallingConvention.StdCall)]
        public static extern int WLGenLicenseSmartKey(string LicenseHash, string UserName, string Organization, string CustomData, string MachineID,
            int NumDays, int NumExec, int NewDate, StringBuilder LicenseBuffer);

    }
}
