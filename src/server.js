import './setup.js';
import { app } from './app.js';

app.listen(5000, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${5000}`);
});
