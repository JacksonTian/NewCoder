export const getCurrentTimeTool = {
  name: 'get_current_time',
  description: 'get current time, return current time in format of year-month-day hour:minute:second',
  parameters: {
    type: 'object',
    properties: {},
    required: []
  },
  execute: async () => {
    const currentTime = new Date().toLocaleString();
    return `Now is ${currentTime}`;
  }
};
