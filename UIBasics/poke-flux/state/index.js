import { Subject } from 'rxjs';
import { BaseDataStore } from './base-data.store';
import { ImageStore } from './image.store';
import { StatsStore } from './stats.store';

// tworzymy centralny dyspozytor jako RxJSowy subject (temat)
export const dispatcher = new Subject();

// tworzymy instancję BaseDataStore
export const baseDataStore = new BaseDataStore(dispatcher);

// oraz pozostałych magazynów
export const imageStore = new ImageStore(dispatcher);
export const statsStore = new StatsStore(dispatcher);
