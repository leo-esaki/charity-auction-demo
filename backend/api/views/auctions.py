import random

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.filters.category import AuctionCategoryFilterBackend
from api.serializers.auctions import AuctionSerializer
from api.serializers.auctions import AuctionDetailWithSimilarSerializer
from api.serializers.auctions import BidSerializer
from api.paginations import FourPerPagePagination
from api.paginations import TwelvePerPagePagination
from api.permissions import IsAdmin
from auction.models import Auction


class AuctionFrontListView(generics.ListAPIView):
    serializer_class = AuctionSerializer
    pagination_class = FourPerPagePagination
    filter_backends = (AuctionCategoryFilterBackend, )
    queryset = Auction.objects.order_by('-started_at') \
        .select_related('product') \
        .select_related('product__donor') \
        .prefetch_related('product__media')


class AuctionListView(generics.ListAPIView):
    serializer_class = AuctionSerializer
    pagination_class = TwelvePerPagePagination
    filter_backends = (AuctionCategoryFilterBackend, )
    queryset = Auction.objects.order_by('-started_at') \
        .select_related('product') \
        .select_related('product__donor') \
        .prefetch_related('product__media')


class AuctionDetailView(generics.RetrieveAPIView):
    serializer_class = AuctionDetailWithSimilarSerializer
    lookup_url_kwarg = 'pk'
    queryset = Auction.objects.order_by('-started_at') \
        .select_related('product') \
        .select_related('product__donor')


class AuctionPlaceBidView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = BidSerializer
    lookup_url_kwarg = 'pk'
    queryset = Auction.objects.select_related('product') \
        .select_related('product__donor')