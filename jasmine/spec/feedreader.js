/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All of the tests are placed within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* Test Suite - This suite is all about
   * the allFeeds variable in the application.
   */
  describe("RSS Feeds", function() {
    /* Test Spec - a test to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it("allFeeds is defined and not empty", function() {
      //allFeeds variable should be defined
      expect(allFeeds).toBeDefined();

      //allFeeds variable should not be empty
      expect(allFeeds.length).not.toBe(0);
    });

    /* Test Spec: a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it("each feed has a URL defined and not empty", function() {
      for (const feed of allFeeds) {
        //expect(feed.url).toBeDefined();
        //expect(feed.url.length).not.toBe(0);
        expect(feed.url).toBeTruthy();
      }
    });

    /* Test Spec: a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it("each feed has a name defined and not empty", function() {
      for (const feed of allFeeds) {
        //expect(feed.name).toBeDefined();
        //expect(feed.name.length).not.toBe(0);
        expect(feed.name).toBeTruthy();
      }
    });
  });

  /* Test Suite - This suite is all about
   * the Menu functionalities
   */
  describe("The menu", function() {
    /* Test Spec: a test that ensures the menu element is
     * hidden by default.
     */
    it("Menu is hidden by default", function() {
      expect($("body")[0]).toHaveClass("menu-hidden");
    });

    /* Test Spec: a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it("Menu visibility change when the menu icon is clicked", function() {
      const spyEvent = spyOnEvent(".menu-icon-link", "click");

      //The menu should display when clicked
      $(".menu-icon-link").click();
      expect("click").toHaveBeenTriggeredOn(".menu-icon-link");
      expect(spyEvent).toHaveBeenTriggered();
      expect($("body")[0]).not.toHaveClass("menu-hidden");

      //The menu should hide when clicked again
      $(".menu-icon-link").click();
      expect("click").toHaveBeenTriggeredOn(".menu-icon-link");
      expect(spyEvent).toHaveBeenTriggered();
      expect($("body")[0]).toHaveClass("menu-hidden");
    });
  });

  /* Test Suite - This suite is all about
   * the Feed Loading functionalities
   */
  describe("Initial Entries", function() {
    //This will be called before running the spec
    beforeEach(function(done) {
      // run the loadFeed function and wait for it to complete
      loadFeed(0, function() {
        done();
      });
    });

    /* Test Spec: a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    it("At least one entry element in the feed container", function() {
      //the number of feed entries within the .feed container should be greater than 0
      //expect($(".feed").children().length).toBeGreaterThan(0);
      expect($(".feed .entry").length).toBeGreaterThan(0);
    });
  });

  /* Test Suite - This suite is to make sure that
   * the content changes when a new feed is loaded
   */
  describe("New Feed Selection", function() {
    let feed0, feed1;

    //This will be called before running the spec
    beforeEach(function(done) {
      /*run the loadFeed function to load one feed,
       *wait for it to complete and
       *save the feed entries to variable feed0
       */
      loadFeed(0, function() {
        feed0 = $(".feed")[0].innerText;
        done();
      });
    });

    /* Test Spec: a test to ensure that content changes
     * when a new feed is loaded
     */
    it("Content changes when a new feed is loaded", function(done) {
      /* Load another feed and wait for its completion
       * save the feed entries to variable feed1
       * compare variable feed0 with feed1 to see if content has changed
       */
      loadFeed(1, function() {
        feed1 = $(".feed")[0].innerText;
        expect(feed0).not.toEqual(feed1);
        done();
      });
    });
  });
});
