# @kitsuyui/luxon-ext

## Usage

```typescript
import { Duration } from 'luxon'
import { toHumanDurationExtended, toHumanDurationWithTemporal, toHumanDurationWithDiff } from '@kitsuyui/luxon-ext'

const duration = Duration.fromObject({ hours: 1, minutes: 23, seconds: 45 })
toHumanDurationExtended(duration))  // => '1 hour, 24 minutes'
toHumanDurationWithTemporal(duration, 'past')  // => '1 hour, 24 minutes ago'
toHumanDurationWithTemporal(duration, 'future')  // => 'in 1 hour, 24 minutes'
const date1 = DateTime.fromISO('2024-01-01T00:00:00Z')
const date2 = DateTime.fromISO('2024-01-01T01:23:45Z')
toHumanDurationWithDiff(date1, date2)  // => 'in 1 hour, 24 minutes'
```

## License

MIT
