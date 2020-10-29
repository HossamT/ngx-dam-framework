import { createSelector } from '@ngrx/store';
import { selectPayloadData, selectFromCollection } from 'ngx-dam-framework';
import { IBlog, IPost } from './blog.model';
import { createEntityAdapter, Dictionary } from '@ngrx/entity';

export const postAdpater = createEntityAdapter<IPost>();
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = postAdpater.getSelectors();

export const selectMyBlog = createSelector(
  selectPayloadData,
  (data): IBlog => {
    return data;
  }
);

export const selectPostEntities = createSelector(
  selectFromCollection<IPost>('posts'),
  selectEntities,
);

export const selectPostById = createSelector(
  selectPostEntities,
  (dictionary: Dictionary<IPost>, props: { id: string }) => {
    return dictionary[props.id];
  },
);
