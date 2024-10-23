const dropdown = [
  {
    label: "Dashboard",
    linkTo: "/snapArt/dashboard",
    icon: "bi bi-house-door",
  },
  {
    label: "Tasks",
    linkTo: "#",
    icon: "bi bi-journals",
    chevron: "bi bi-chevron-down",
    children: [
      {
        label: "Add Tasks",
        linkTo: "/addTasks",
        icon: "bi bi-plus",
      },
      {
        label: "Due Today",
        linkTo: "/tasksDueToday",
        icon: "bi bi-brightness-high",
      },
      {
        label: "Completed",
        linkTo: "/completed",
        icon: "bi bi-check-all",
      },
      { label: "Categories", linkTo: "/categories", icon: "bi bi-table" },
    ],
  },
  {
    label: "Products",
    linkTo: "#",
    icon: "bi bi-box",
    chevron: "bi bi-chevron-down",
    children: [
      { label: "Adverts", linkTo: "/adverts", icon: "bi bi-graph-up" },
    ],
  },
  {
    label: "Competitions",
    linkTo: "#",
    icon: "bi bi-caret-right-fill",
    chevron: "bi bi-chevron-down",
    children: [
      { label: "All", linkTo: "/allCompetitions", icon: "bi bi-book" },
      {
        label: "Create",
        linkTo: "/createCompetitions",
        icon: "bi bi-plus",
      },
      { label: "Involved", linkTo: "/involved", icon: "bi bi-check-square" },
    ],
  },
  {
    label: "Reccommend",
    linkTo: "#",
    icon: "bi bi-calendar",
    chevron: "bi bi-chevron-down",
    children: [
      {
        label: "All Accounts",
        linkTo: "/allAccounts",
        icon: "bi bi-clipboard-check",
      },
      {
        label: "Create Account",
        linkTo: "/createAccount",
        icon: "bi bi-journal-check",
      },
      {
        label: "Reccommended",
        linkTo: "/reccommendedAccounts",
        icon: "bi bi-chat-dots",
      },
    ],
  },
  {
    label: "Transactions",
    linkTo: "#",
    icon: "bi bi-calendar",
    chevron: "bi bi-chevron-down",
    children: [
      {
        label: "All",
        linkTo: "/allTransactions",
        icon: "bi bi-clipboard-check",
      },
      {
        label: "Pending",
        linkTo: "/pendingTrans",
        icon: "bi bi-journal-check",
      },
      {
        label: "History",
        linkTo: "/transactionsHistory",
        icon: "bi bi-chat-dots",
      },
    ],
  },
  {
    label: "Users",
    linkTo: "#",
    icon: "bi bi-people",
    chevron: "bi bi-chevron-down",
    children: [
      { label: "Followers", linkTo: "/followers", icon: "bi bi-person" },
      { label: "Followed", linkTo: "/followed", icon: "bi bi-person-badge" },
      { label: "Trending", linkTo: "/trending", icon: "bi bi-star" },
    ],
  },
];
export default dropdown;
