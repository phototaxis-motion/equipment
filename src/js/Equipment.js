class Equipment {
  constructor({
    name = 'untitled',
    category = '',
    id,
    date = '2000-01-01',
    receipt = '',
    price = 0,
    salvage = 0,
    type,
    format,
    department,
    location,
    person,
    state,
    photo
  }) {
    Object.assign(this, {name,
      category,
      id,
      date,
      receipt,
      price,
      salvage,
      type,
      format,
      department,
      location,
      person,
      state,
      photo})
  }

  
}