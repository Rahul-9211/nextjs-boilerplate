// utils/indexedDB.ts
import { IDimageList, OrderListImage } from '@/utils/types';
import { openDB, IDBPDatabase, deleteDB } from 'idb';

const dbName = 'my-database';
const storeName = 'my-store';




let dbPromise: Promise<IDBPDatabase> | undefined;

async function initDB(): Promise<IDBPDatabase> {
  if (typeof window === 'undefined') {
    throw new Error('IndexedDB is not supported on the server');
  }

  if (!dbPromise) {
    dbPromise = openDB(dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'brandId' }); // Use brandId as the keyPath
        }
      },
    });
  }

  return dbPromise;
}

export async function addItem(item: IDimageList): Promise<void> {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.put(item); // Using put to update if exists, otherwise add
  await tx.done;
}

export async function getItems(): Promise<IDimageList[]> {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const allItems = await store.getAll();
  await tx.done;
  return allItems;
}



export async function clearDatabase(): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Error('IndexedDB is not supported on the server');
    }
  
    await deleteDB('my-database', {
      blocked() {
        console.log('Database deletion blocked');
      },
    });
  }