# Timer App

Aivanyi

## Goals

- ~~Show Time~~
- Timer/Stopwatch
- ~~Pomodoro setting~~
- Separate Timer window
- ToDo App
- Routines functionality for tasks

## Schema for data

```json
{
  date: Date;
  tasks: Map<string , { id : string , desc : string , isDone: boolean }>;
}
```
