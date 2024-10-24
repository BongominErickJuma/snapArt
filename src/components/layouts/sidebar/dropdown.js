const dropdown = [
  {
    label: "Dashboard",
    linkTo: "/snapArt/dashboard",
    icon: "bi bi-house-door", // Home icon for the dashboard
  },
  {
    label: "Tasks",
    linkTo: "#",
    icon: "bi bi-list-task", // Task list icon for tasks
    chevron: "bi bi-chevron-down",
    children: [
      {
        label: "All tasks",
        linkTo: "/snapArt/allTasks",
        icon: "bi bi-list-check", // List with checks for all tasks
      },
      {
        label: "My Tasks",
        linkTo: "/snapArt/myTasks",
        icon: "bi bi-calendar-day", // Calendar icon for my tasks
      },
      {
        label: "Completed",
        linkTo: "/snapArt/completedTasks",
        icon: "bi bi-check-circle-fill", // Solid check circle for completed tasks
      },
      {
        label: "Categories",
        linkTo: "/snapArt/taskCategories",
        icon: "bi bi-grid", // Grid icon for categories
      },
    ],
  },
  {
    label: "Adverts",
    linkTo: "#",
    icon: "bi bi-bullseye", // Target icon for adverts
    chevron: "bi bi-chevron-down",
    children: [
      { label: "All", linkTo: "/snapArt/allAdverts", icon: "bi bi-collection" }, // Collection icon for all adverts
      {
        label: "Products",
        linkTo: "/snapArt/products",
        icon: "bi bi-box-seam", // Box seam icon for products
      },
      {
        label: "Subscriptions",
        linkTo: "/snapArt/subscriptions",
        icon: "bi bi-receipt", // Receipt icon for subscriptions
      },
    ],
  },
  {
    label: "Competitions",
    linkTo: "#",
    icon: "bi bi-trophy", // Trophy icon for competitions
    chevron: "bi bi-chevron-down",
    children: [
      {
        label: "All",
        linkTo: "/snapArt/allCompetitions",
        icon: "bi bi-calendar-event", // Calendar event icon for all competitions
      },
      {
        label: "Completed",
        linkTo: "/snapArt/completeCompetitions",
        icon: "bi bi-check-circle", // Check circle for completed competitions
      },
      {
        label: "Upcoming",
        linkTo: "/snapArt/upcomingCompetitions",
        icon: "bi bi-forward-fill", // Forward icon for upcoming competitions
      },
      {
        label: "Ongoing",
        linkTo: "/snapArt/ongoingCompetitions",
        icon: "bi bi-play-circle", // Play circle icon for ongoing competitions
      },
      {
        label: "Competitors",
        linkTo: "/snapArt/competitors",
        icon: "bi bi-person-lines-fill ", // Play circle icon for ongoing competitions
      },
    ],
  },
  {
    label: "Transactions",
    linkTo: "#",
    icon: "bi bi-cash-stack", // Cash stack icon for transactions
    chevron: "bi bi-chevron-down",
    children: [
      {
        label: "Deposit",
        linkTo: "/snapArt/depositTrans",
        icon: "bi bi-arrow-up-circle", // Arrow up for deposit
      },
      {
        label: "Reward",
        linkTo: "/snapArt/rewardTrans",
        icon: "bi bi-gift", // Gift icon for rewards
      },
      {
        label: "Payments",
        linkTo: "/snapArt/paymentTrans",
        icon: "bi bi-credit-card", // Credit card for payments
      },
      {
        label: "Withdraw",
        linkTo: "/snapArt/widthdrawTrans",
        icon: "bi bi-wallet", // Wallet for withdraw
      },
      {
        label: "History",
        linkTo: "/snapArt/transactionsHistory",
        icon: "bi bi-clock-history", // Clock history icon for transaction history
      },
    ],
  },
  {
    label: "Wallet",
    linkTo: "#",
    icon: "bi bi-wallet2", // Wallet icon
    chevron: "bi bi-chevron-down",
    children: [
      { label: "Assets", linkTo: "/snapArt/assets", icon: "bi bi-boxes" }, // Boxes icon for assets
      {
        label: "Exchanges",
        linkTo: "/snapArt/exchanges",
        icon: "bi bi-currency-exchange", // Currency exchange icon for exchanges
      },
      {
        label: "Holding",
        linkTo: "/snapArt/holding",
        icon: "bi bi-pie-chart", // Pie chart icon for holding
      },
      {
        label: "Account",
        linkTo: "/snapArt/myAccount",
        icon: "bi bi-person-circle", // Person circle for account
      },
    ],
  },
  {
    label: "Recommend",
    linkTo: "#",
    icon: "bi bi-hand-thumbs-up", // Thumbs-up icon for recommendations
    chevron: "bi bi-chevron-down",
    children: [
      {
        label: "Youtube",
        linkTo: "/snapArt/youtube",
        icon: "bi bi-youtube", // Youtube icon
      },
      {
        label: "Twitter",
        linkTo: "/snapArt/twitter",
        icon: "bi bi-twitter", // Twitter icon
      },
      {
        label: "Tiktok",
        linkTo: "/snapArt/tiktok",
        icon: "bi bi-tiktok", // Tiktok icon
      },
      {
        label: "Facebook",
        linkTo: "/snapArt/facebook",
        icon: "bi bi-facebook", // Facebook icon
      },
      {
        label: "Instagram",
        linkTo: "/snapArt/instagram",
        icon: "bi bi-instagram", // Instagram icon
      },
      {
        label: "Telegram",
        linkTo: "/snapArt/telegram",
        icon: "bi bi-telegram", // Telegram icon
      },
      {
        label: "Snapchat",
        linkTo: "/snapArt/snapchat",
        icon: "bi bi-snapchat", // Snapchat icon
      },
    ],
  },
  {
    label: "Users",
    linkTo: "/snapArt/users",
    icon: "bi bi-people", // People icon for users
  },
];

export default dropdown;
