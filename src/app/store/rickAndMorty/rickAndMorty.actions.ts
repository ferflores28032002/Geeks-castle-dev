// rickAndMorty.actions.ts
export class LoadCharacters {
  static readonly type = '[Character] Load';
  constructor(public page: number) {}
}

export class AddToFavorites {
  static readonly type = '[Character] Add to Favorites';
  constructor(public characterId: number) {}
}

export class RemoveFromFavorites {
  static readonly type = '[Character] Remove from Favorites';
  constructor(public characterId: number) {}
}

export class AddToSelected {
  static readonly type = '[Character] Add to Selected';
  constructor(public characterId: number) {}
}

export class RemoveFromSelected {
  static readonly type = '[Character] Remove from Selected';
  constructor(public characterId: number) {}
}

export class ClearSelected {
  static readonly type = '[Character] Clear Selected';
  // No se necesita un constructor ya que no se pasan parámetros
}
