import { createDataView } from './data.view';
import { createImageView } from './image.view';
import { createStatsView } from './stats.view';
import { createNameEditView } from './name-edit.view';

export function createViews() {
  createImageView();
  createDataView();
  createNameEditView();
  createStatsView();
}
