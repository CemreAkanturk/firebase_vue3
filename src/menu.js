import {
  mdiAccountCircle,
  mdiDesktopMac,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
} from "@mdi/js";

export default [
  "General",
  [
    {
      to: "/",
      icon: mdiDesktopMac,
      label: "Anasayfa",
    },
    {
	to: "/musteriler",
	icon: mdiDesktopMac,
	label: "Müşteriler",
   },
    {
      to: "/",
      icon: mdiTable,
      label: "Stok İşlemleri",
	 menu: [
		{
		  label: "STOK GRUPLARI",
		},
		{
		  label: "STOK HAREKETLERİ",
		}
	
	   ],
    },
    {
      to: "/",
      icon: mdiTable,
      label: "Alış/Satış İşlemleri",
      menu: [
        {
          label: "ALIŞ YAP",
        },
        {
          label: "SATIŞ YAP",
        },
        {
          label: "ALIŞ FATURALARI",
        },
        {
          label: "SATIŞ FATURALARI",
        },
        {
          label: "TAKSİT FATURALARI",
        },
        {
          label: "TÜM FATURALAR",
        },
      ],
    },
    {
	to: "/",
	icon: mdiDesktopMac,
	label: "Genel Giderler",
   },
    {
	to: "/",
	icon: mdiDesktopMac,
	label: "Ödemeler",
   },
   
    {
	to: "/",
	icon: mdiDesktopMac,
	label: "Raporlar",
   }
  ],

  "Examples",
  [
    {
      to: "/tables",
      label: "Tables",
      icon: mdiTable,
      updateMark: true,
    },
    {
      to: "/forms",
      label: "Forms",
      icon: mdiSquareEditOutline,
    },
    {
      to: "/ui",
      label: "UI",
      icon: mdiTelevisionGuide,
    },
    {
      to: "/responsive",
      label: "Responsive",
      icon: mdiResponsive,
    },
    {
      to: "/profile",
      label: "Profile",
      icon: mdiAccountCircle,
    },
    {
      to: "/login",
      label: "Login",
      icon: mdiLock,
    },
    {
      to: "/error",
      label: "Error",
      icon: mdiAlertCircle,
    },
    {
      label: "Submenus",
      subLabel: "Submenus Example",
      icon: mdiViewList,
      menu: [
        {
          label: "Sub-item One",
        },
        {
          label: "Sub-item Two",
        },
      ],
    },
  ],
];
