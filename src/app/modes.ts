export type Mode = {
  value: string;
  label: string;
  pomodoro: number;
  break: number;
  longBreak: number;
};

export const MODES: Mode[] = [
  {
    value: 'beginner',
    label: 'Beginner',
    pomodoro: 10,
    break: 5,
    longBreak: 10,
  },
  {
    value: 'default',
    label: 'Default',
    pomodoro: 20,
    break: 5,
    longBreak: 15,
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    pomodoro: 40,
    break: 8,
    longBreak: 20,
  },
  {
    value: 'advanced',
    label: 'Advanced',
    pomodoro: 60,
    break: 10,
    longBreak: 25,
  },
];
