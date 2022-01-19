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
      icon: mdiTable,
      label: "Satışlar",
      menu: [
        {
		to: "/faturalar",
          label: "FATURALAR",
        },
        {
		to: "/satıs-raporları",
          label: "SATIŞLAR RAPORU",
        },
        {	
		to: "/tahsilat-raporları",
          label: "TAHSİLATLAR RAPORU",
        },
        {
		to: "/gelir-gider-raporu",
          label: "GELİR GİDER RAPORU",
        }
      ],
    },
    {
	to: "/",
	icon: mdiDesktopMac,
	label: "Giderler",
	menu: [
		{
		  label: "GİDER LİSTESİ",
		},
		{
		  label: "TEDARİKÇİLER",
		},
		{
		  label: "GİDERLER RAPORU",
		},
		{
			label: "KDV RAPORU",
	     }
	   ],
   },
    {
	to: "/",
	icon: mdiDesktopMac,
	label: "Ödemeler",
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
