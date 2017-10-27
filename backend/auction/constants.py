AUCTION_STATUS_OPEN = 'open'
AUCTION_STATUS_FINISHED = 'finished'
AUCTION_STATUS_CANCELLED = 'cancelled'

AUCTION_STATUS_CHOICES = (
    (AUCTION_STATUS_OPEN, 'Open'),
    (AUCTION_STATUS_FINISHED, 'Finished'),
    (AUCTION_STATUS_CANCELLED, 'cancelled'),
)

BID_STATUS_ACTIVE = 'active'
BID_STATUS_WON = 'won'
BID_STATUS_LOST = 'lost'
BID_STATUS_REJECTED = 'rejected'

BID_STATUS_CHOICES = (
    (BID_STATUS_ACTIVE, 'Active'),
    (BID_STATUS_WON, 'Won'),
    (BID_STATUS_LOST, 'Lost'),
    (BID_STATUS_REJECTED, 'Rejected'),
)