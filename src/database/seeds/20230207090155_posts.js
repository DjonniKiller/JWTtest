/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    { header: 'Kono Giorno Giovana', text: 'MudaMudaMuda говорит наш маленький Джованно.', author: 1 },
    { header: 'Random header', text: 'Random text', author: 1 },
    { header: 'Another random header', text: 'Another random text', author: 1 },
    { header: 'И тут опана, резко на русском', text: 'Да, да, все еще на русском', author: 1 },
    { header: 'Some fucking dogshit', text: 'Road roller da', author: 2 },
    { header: 'Penguin says hello', text: '*< Hello', author: 2 },
    { header: 'Dog says goodbye', text: '^[*.*]^ Goodbye', author: 2 },
    { header: 'Я ног не чувствую', text: 'А я ему такой У тебя их нет!', author: 2 },
    { header: 'Ни мамы, ни папы', text: 'Бедный Питер Паркер', author: 2 },
    { header: 'Ах ты ж наш гоблин младший', text: 'Ну давай, заплачь', author: 2 },
    { header: 'Конфетка', text: 'Нету ручек, нет конфетки', author: 3 },
    { header: 'Внимание анектод', text: 'Значит, поцеловались, конкретно, в Зоне две тачилы. Из одной сталкеры вывалили, из другой… Короче, пошли тут терки, разборки, махалово конкретное.А контролер на нычке сидит и лыбу давит: — Оооо, зашибись. Ща поляна накроется — не стыдно и братанов, чисто, на хату позвать.', author: 3 },
    { header: 'Точно не РикРолл', text: 'https://www.youtube.com/watch?v=XfELJU1mRMg&ab_channel=Supirorguy508', author: 3 },
    { header: 'У меня мемы закончились уже', text: 'Даб даб даб', author: 3 },
    { header: '', text: 'Тупа текст', author: 3 },
  ]);
};
