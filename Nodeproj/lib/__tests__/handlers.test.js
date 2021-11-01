const handlers = require('../handlers')

test('home page renders', () => {
  const req = {}
  const res = { render: jest.fn() }
  handlers.home(req, res) 
  expect(res.render.mock.calls[0][0]).toBe('home')
  // checks what gets passed to app to render when home handler is called
})

test('about page renders with fortune',() => {
  const req = {}
  const res = { render: jest.fn() }
  handlers.about(req, res)
  expect(res.render.mock.calls.length).toBe(1)
  // sets expected number of calls to = 1
  expect(res.render.mock.calls[0][0]).toBe('about')
  // sets expected route to return 'about'
  expect(res.render.mock.calls[0][1]).toEqual(expect.objectContaining({
    // sets expectation of content rendered to contain fortune object
    fortune: expect.stringMatching(/\W/),
  }))
})

test('404 handler renders', () => {
  const req = {}
  const res = {render: jest.fn()}
  handlers.notFound(req, res)
  // calls not found handler
  expect(res.render.mock.calls.length).toBe(1)
  // sets expected number of calls to = 1
  expect(res.render.mock.calls[0][0]).toBe('404')
  // sets expected route to return '404'
})

test('500 handler renders', () => {
  const err = new Error('some error')
  const req = {}
  const res = { render: jest.fn() }
  const next = jest.fn()
  handlers.serverError(err, req, res, next)
  // calls serverError handler, creates mocks for ness args
  expect(res.render.mock.calls.length).toBe(1)
  // sets expected number of calls to = 1
  expect(res.render.mock.calls[0][0]).toBe('500')
  // sets expected route to return '500
})

