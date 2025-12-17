// MOCK_RESPONSES for chat responses
const MOCK_RESPONSES = [
  {
    table: {
      headers: ["Metric", "Description", "Formula", "Benchmark"],
      rows: [
        ["CTR", "Click-Through Rate", "Clicks/Impressions", "2-5%"],
        ["CPC", "Cost Per Click", "Total Cost/Clicks", "$0.50-$2.00"],
        ["ROAS", "Return on Ad Spend", "Revenue/Ad Spend", "4:1"],
        [
          "CAC",
          "Customer Acquisition Cost",
          "Total Cost/New Customers",
          "$100-$300",
        ],
      ],
    },
    description:
      "These are the most critical metrics for digital marketing campaigns. Focus on improving CTR and ROAS for better performance.",
  },
  {
    table: {
      headers: ["Month", "Sales", "Growth %", "Target"],
      rows: [
        ["Jan", "1200", "+15%", "1000"],
        ["Feb", "1500", "+25%", "1300"],
        ["Mar", "1800", "+20%", "1600"],
        ["Apr", "2200", "+22%", "2000"],
      ],
    },
    description:
      "Sales are trending upward and exceeding targets consistently.",
  },
  {
    table: {
      headers: ["Channel", "Reach", "Engagement Rate", "Cost"],
      rows: [
        ["Email", "50K", "28%", "$0.02/email"],
        ["Social Media", "1M", "3.5%", "$500/day"],
        ["Google Ads", "200K", "5%", "$1,200/day"],
        ["SEO", "100K", "12%", "$800/month"],
      ],
    },
    description:
      "Multi-channel approach maximizes reach and engagement across platforms.",
  },
  {
    table: {
      headers: ["Step", "Action", "Duration", "Responsible"],
      rows: [
        ["1", "Market Research", "2 weeks", "Marketing Team"],
        ["2", "Content Creation", "3 weeks", "Content Team"],
        ["3", "Campaign Launch", "1 day", "Campaign Manager"],
        ["4", "Optimization", "Ongoing", "Performance Team"],
      ],
    },
    description:
      "Follow this structured approach for successful campaign execution.",
  },
];

module.exports = {
  MOCK_RESPONSES,
};
