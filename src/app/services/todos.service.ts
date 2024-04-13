import {
  Injectable,
  NgZone,
  OnDestroy,
  isDevMode
} from '@angular/core';
import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  Timestamp,
  onSnapshot,
  WithFieldValue,
  QueryDocumentSnapshot,
  Firestore
} from '@angular/fire/firestore';

import { UserService } from './user.service';
import {
  BehaviorSubject,
  Observable,
  firstValueFrom,
  map,
  of,
  switchMap
} from 'rxjs';

export interface TodoItem {
  id: string;
  text: string;
  complete: boolean;
  created: Date;
  uid: string;
};

export type TodoType = {
  loading: boolean;
  data: TodoItem[];
};

const todoConverter = {
  toFirestore(value: WithFieldValue<TodoItem>) {
    return value;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot
  ) {
    const data = snapshot.data({
      serverTimestamps: 'estimate'
    });
    const created = data['created'] as Timestamp;
    return {
      ...data,
      created: created.toDate(),
      id: snapshot.id
    } as TodoItem;
  }
};


@Injectable({
  providedIn: 'root'
})
export class TodosService implements OnDestroy {

  private _todos = new BehaviorSubject<TodoType>({
    loading: true,
    data: []
  });

  constructor(
    private zone: NgZone,
    private db: Firestore,
    private us: UserService
  ) {}

  todos = this._todos.asObservable();

  private _subscription = this._getTodos();

  private _getTodos() {
    // get todos from user observable
    return this.us.user.pipe(
      switchMap((_user) => {

        // get todos if user
        if (_user.data) {
          return this._getTodosFromUser(
            _user.data.uid
          );
        }
        // otherwise return empty
        return of({
          loading: false,
          data: []
        });
      })
    ).subscribe(this._todos);
  }

  private _getTodosFromUser(uid: string) {
    // query realtime todo list
    return new Observable<QuerySnapshot<TodoItem>>(
      (subscriber) => onSnapshot(
        query(
          collection(this.db, 'todos'),
          where('uid', '==', uid),
          orderBy('created')
        ).withConverter(todoConverter),
        snapshot => this.zone.run(() => subscriber.next(snapshot)),
        error => this.zone.run(() => subscriber.error(error))
      )
    )
      .pipe(
        map((arr) => {

          /**
           * Note: Will get triggered 2x on add 
           * 1 - for optimistic update
           * 2 - update real date from server date
          */

          if (arr.empty) {
            return {
              loading: false,
              data: []
            };
          }
          const data = arr.docs
            .map((snap) => snap.data());

          // print data in dev mode
          if (isDevMode()) {
            console.log(data);
          }
          return {
            loading: false,
            data
          };
        })
      );
  }

  addTodo = async (e: SubmitEvent) => {

    e.preventDefault();

    const userData = await firstValueFrom(
      this.us.user
    );

    if (!userData.data) {
      throw 'No User!';
    }

    // get and reset form
    const target = e.target as HTMLFormElement;
    const form = new FormData(target);
    const { task } = Object.fromEntries(form);

    if (typeof task !== 'string') {
      return;
    }

    // reset form
    target.reset();

    addDoc(collection(this.db, 'todos'), {
      uid: userData.data.uid,
      text: task,
      complete: false,
      created: serverTimestamp()
    });
  }

  updateTodo = (id: string, complete: boolean) => {
    updateDoc(doc(this.db, 'todos', id), { complete });
  }

  deleteTodo = (id: string) => {
    deleteDoc(doc(this.db, 'todos', id));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}


