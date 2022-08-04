# Print Stats

Print stats when processing multiple records in a looping scenario.
Shows you:

1. Number of rows.
2. Number of errors.
3. Records per second.
4. Overall elapsed time.

```typescript
const dbStats = stats('myCollection')

const records = await getSomeData()

for (const record of records) {
  try {
    await someDatabase.write(record)
    dbStats.incRows()
  } catch (e) {
    dbStats.incErrors()
  }
  dbStats.print()
}
// myCollection: Rows 6,376 | Errors 1 | Rate 14 rec/sec | Elapsed 7m 15.8s
```
