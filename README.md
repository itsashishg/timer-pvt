# Timer App

Aivanyi

## Goals

- ~~Show Time~~
- ~~Timer/Stopwatch~~
- ~~Pomodoro setting~~
- Separate Timer window
- ~~ToDo App~~
- ~~Routines functionality for tasks~~
- Optimizations
- History cleanup

## Schema for data

```json
{
  date: Date;
  tasks: Map<string , { id : string , desc : string , isDone: boolean, isRoutine: boolean, routineTaskId: string }>;
}
```

## Schema for Routine tasks

```json
{
  id: string;
  taskName: string;
  type: 'DAILY'|'WEEKLY'|'BI_WEEKLY'|'MONTHLY';
  days: string[];
  dates: number[];
}
```
